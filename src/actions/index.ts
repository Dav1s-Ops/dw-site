import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { RESEND_API_KEY, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { Resend } from 'resend';

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      email: z.email(),
      message: z.string().trim().min(10).max(5000),
      sendCopy: z.boolean().optional(),
      'cf-turnstile-response': z.string().min(1, 'Please complete the challenge'),
    }),
    handler: async (input, context) => {
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY,
          response: input['cf-turnstile-response'],
          remoteip: context.request.headers.get('CF-Connecting-IP') ?? '',
        }),
      });
      const outcome = (await verify.json()) as { success: boolean };
      if (!outcome.success) throw new ActionError({ code: 'FORBIDDEN', message: 'Bot check failed. Try again.' });

      const resend = new Resend(RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: 'DW Site <feedback@dav1s.dev>',
        to: 'davis@dav1s.dev',
        replyTo: input.email,
        subject: 'New message from dav1s.dev',
        text: `From: ${input.email}\n\n${input.message}`,
      });
      if (error) throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message: 'Could not send right now.' });

      if (input.sendCopy) {
        await resend.emails.send({
          from: 'DW Site <feedback@dav1s.dev>',
          to: input.email,
          subject: 'Copy of your message to Davis',
          text: input.message,
        });
      }
      return { ok: true };
    },
  }),
};