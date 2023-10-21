# Cars Management API

1. Database Diagram

ini database diagram dari challenge chapter 5 Car Management Dashboard :

![My Image](/public/img/db-diagram.png)

2. Configuration :

   - git clone ..
   - npm install
   - buat file .env, copy env variable dari .env.example
   - config database (tambahkan npx didepan jika tidak install sequelize secara global):

     - sequelize db:create
     - sequelize db:migrate
     - sequelize db:seed:all (untuk insert data Superadmin)

   - npm run dev

### localhost:3000/

3. View Page

   > Selengkapnya ada di OpenAPI `http://localhost:3000/api-docs`

4. Account Superadmin

   `email: "imam@gmail.com",
password: "imamganteng"`

   `email: "michael@gmail.com",
password:"michaelganteng"`

   `email: "yoga@gmail.com",
    password:"yogaganteng",`

   `email: "ali@gmail.com", password:"aliganteng",`

   `email: "ale@gmail.com", password:"aleganteng",`
