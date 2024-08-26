import { http, HttpResponse } from 'msw';


const getUsersHandler = http.get('/api/users', () => {
    return new HttpResponse(JSON.stringify([
      { id: 1, name: 'John1 Doe' },
      { id: 2, name: 'Jane 1Doe' }
    ]), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  });

const addUserHandler = http.post('/api/users', async (req) => {

  const body = await req.request.text(); 
  const parsedBody = JSON.parse(body);

  const { name }: { name: string } = parsedBody;
  const newUser = { id: Date.now(), name };

  return new HttpResponse(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json',
        'Cache-Control': 'no-store' 
     }
  });
});

export const handlers = [getUsersHandler,addUserHandler];
