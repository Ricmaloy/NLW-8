import express from "express";
import nodemailer from "nodemailer";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();



routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  //   await transport.sendMail({
  //     from: "Equipe Feedget <oi@feedget.com>",
  //     to: "Ricardo Zamboni <ricardozamboni021@gmail.com>",
  //     subject: "Novo feedback",
  //     html: [
  //       '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
  //       `<p>Tipo do feedback: ${type}</p>`,
  //       `<p>Comentário: ${comment}</p>`,
  //       "</div>",
  //     ].join("\n"),
  //   });

  return res.status(201).send();
});
