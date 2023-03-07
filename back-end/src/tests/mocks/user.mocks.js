const validUser = [ {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '$#zebirita#$',
    role: 'customer',
  }
];

const customerUser = 
    {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplYmlyaXRhQGVtYWlsLmNvbSIsImlhdCI6MTY3ODEzNTE0MSwiZXhwIjoxNjc4MjIxNTQxfQ.Jp6xnTHwvK0YLZNHFmW3OzGXviSGVxipr9oPLb393Qk",
        name: "Cliente Zé Birita",
        role: "customer",
        id: 3,
        email: "zebirita@email.com"
      };


module.exports = {
    validUser,
    customerUser,
};