export function ErrorCreator(status, answer) {
  const error = new Error(answer);
  error.status = status;

  return error;
}
