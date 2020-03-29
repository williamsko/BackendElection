const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose');


AdminBro.registerAdapter(AdminBroMongoose)



const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
 // resources: [{ resource: users, options: {Parent: contentParent}}],
  branding: {
    companyName: 'Ajcad Election',
    logo:'https://i.ibb.co/jfkNNHt/icone-malicratie.png',
    favicon:'https://i.ibb.co/jfkNNHt/icone-malicratie.png',
    SoftwareBrothers:true,
  },
  
})

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'test@example.com',
    password: process.env.ADMIN_PASSWORD || 'test',
  }
  

const router = AdminBroExpress.buildRouter(adminBro)


module.exports=router;