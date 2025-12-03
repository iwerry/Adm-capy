import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function run() {
  const catNews = await prisma.category.upsert({
    where: { slug: "news" },
    update: {},
    create: { name: "News", slug: "news" }
  })

  const catSports = await prisma.category.upsert({
    where: { slug: "sports" },
    update: {},
    create: { name: "Sports", slug: "sports" }
  })

  await prisma.article.upsert({
    where: { slug: "welcome" },
    update: {},
    create: {
      title: "Welcome",
      slug: "welcome",
      content: "Hello",
      excerpt: "Hello",
      categoryId: catNews.id
    }
  })

  await prisma.article.upsert({
    where: { slug: "match-day" },
    update: {},
    create: {
      title: "Match Day",
      slug: "match-day",
      content: "Update",
      excerpt: "Update",
      categoryId: catSports.id
    }
  })
}

run().finally(async () => {
  await prisma.$disconnect()
})
