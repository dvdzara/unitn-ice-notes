import { defineCollection, reference, z } from "astro:content";

const courses = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string().min(1),
    teachers: z.array(z.string().min(1)).min(1),
  }),
});

const lessons = defineCollection({
  type: "content",
  schema: z.object({
    course: reference("course"),
    date: z.date(),
  }),
});

export const collections = { courses, lessons };
