export const adminOnlyReadOnly = (context: {
  currentUser?: {roles?: {name: string}[]} | null
}) => !context.currentUser?.roles?.some((r) => r.name === 'administrator')
