import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Divisions
  const divisions = [
    { name: 'Gastro', description: 'Advanced solutions for gastrointestinal health and digestive care.' },
    { name: 'Ortho', description: 'Innovative treatments for musculoskeletal and joint health.' },
    { name: 'Pediatrics', description: 'Gentle, effective, and safe care for the little ones.' },
    { name: 'Cardio', description: 'Premium cardiovascular formulations for a healthier heart.' }
  ];

  for (const div of divisions) {
    await prisma.division.upsert({
      where: { name: div.name },
      update: {},
      create: { name: div.name, description: div.description }
    });
  }

  // Information
  const informations = [
    { title: "Understanding Gut Health", category: "Gastroenterology", desc: "Learn about the importance of microbiome balance and how dietary choices impact your daily digestive wellness." },
    { title: "Joint Care in Winter", category: "Orthopedics", desc: "Essential tips and preventative measures to maintain joint mobility and reduce stiffness during colder months." },
    { title: "Cardiovascular Wellness", category: "Cardiology", desc: "Simple lifestyle modifications that can significantly improve heart health and prevent long-term complications." }
  ];

  // Just create them if empty
  const infoCount = await prisma.information.count();
  if (infoCount === 0) {
    for (const info of informations) {
      await prisma.information.create({ data: info });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
