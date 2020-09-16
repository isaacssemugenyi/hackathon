# client
# accounts
# admin
# mojaloop
# service providers
# other financial institutes

http://localhost:6060
=> Located in defaultRoutes
GET: / will serve the default index page (add the first page)

GET: /services will serve the services(plans page)

=> Located in clientRoutes
GET: /client/login serves login page with the form

GET: /client/signup serves the signup page for first time registration

GET: /client/dashboard Displays the dashboard after logging in, displays the balance (userDeposit) and (data carries the list of all deposits made by a particular account, put them in a table with amount and createdAt date) as well of the currently logged in user, if any

POST: /client/signup Posts data for new signed up users

POST: /client/login Posts the username and password to login

GET: /client/logout Returns to login page when you log out

Located in depositRoutes

GET /deposit Serves the form for amount to save, single field for amount should be in the form

POST: /deposit Post route to save the amount saved to database

