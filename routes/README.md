## Funtions

#### loggedIn

Checks wheather there is a valid session 

#### getScope 

Checks what scope the user has

#### isAdmin 

Checks if the user's scope is admin

#### getCookieData

Gets cookie data


## Routes

#### / 
 index

#### /admin


/barracas/fila/:numero
/chapeus/fila/:numero

#### /vista-geral


#### /alterar
	- /alterar/reserva/datas
		post

	- /alterar/reserva/:id
	- /alterar/aluguer/:id

#### /relatorios/
Generating reports

	- /relatorios/aluguer/hoje
	- /relatorios/reservas/:ano/:mes
	- /relatorios/reservas/:ano/:mes/:espacoId

#### /informacao


#### /login
	post

#### /users	
	- /users/manage/users

###### POST
	- /users/revoke/access
	- /users/set/password
	- /users/create/user/


	- /cancelar/aluguer/:id

	- /alugar/barraca/:id
	- /reservar/barraca/:id

#### /calendar
For calendar views

	- /calendar/:espaco

