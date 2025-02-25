// import {
//   ApiTodoParticipantCandidateSearchGetResponse,
// } from '@/api';

export type ValueOf<T> = T[keyof T];

export type ArrayItem<T> = T extends (infer R)[] ? R : never;
