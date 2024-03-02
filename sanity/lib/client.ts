import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:
  "skdngjfPerlPXzTF2nkCtLgf8SA7gRcPwVQ40KcKDZ6omSjtyMl5wH7Q083uifqj4k9Z8sXmmu5pPJ49ZwMwtlYNZ9dl8iRs4cfpHeCYuVzjZs4CdzHGS6Hg5FUWTEMjxQVbm5gId2S71hI7qEPIAhijzZXZgFaG1S30WGbjxyfjPhK6icOO"
})
