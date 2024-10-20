import { Attachment } from './attachments.model';
import { AttemptAnswer } from './attempt-answer';
import { Choice } from './choice.model';
import { Question } from './question.model';
import { Quiz } from './quiz.model';
import { StudentAttempt } from './student-attempt.model';
import { User } from './user.model';

const models = [
  User,
  Attachment,
  Quiz,
  Question,
  StudentAttempt,
  Choice,
  AttemptAnswer,
];

export { models };
