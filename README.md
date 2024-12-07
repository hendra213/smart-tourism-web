```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

mysql database, add this to .env.local :

```bash
DATABASE_URL=mysql://username:password@localhost:3306/nama_database
NEXTAUTH_SECRET=smart-tourism

# misal
CHATBOT_URL=http://localhost:5000/chat
```

set up prisma, import database first

```bash
pnpm i
npx prisma db pull
npx prisma generate
```
