import { registerEnumType } from '@nestjs/graphql';

enum RandomQuizType {
  C_PLUS_PLUS = 'C_PLUS_PLUS',
  DISCRETE = 'DISCRETE',
  PYTHON = 'PYTHON',
  ASSEMBLY = 'ASSEMBLY',
  DATA_SCIENCE = 'DATA_SCIENCE',
}

registerEnumType(RandomQuizType, {
  name: 'RandomQuizType',
});

export { RandomQuizType };
