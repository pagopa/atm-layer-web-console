import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Ctx } from '../../../DataContext';
import LoginPageCallback from '../../LoginPageCallback';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  window.history.pushState({}, '', '/webconsole/login/callback#access_token=test-token');
});

describe('LoginPageCallback test', () => {
  test('setLogged true', () => {
    const setLogged = false;

    Object.defineProperty(window, 'location', {
      value: {
        hash: '#access_token=eyJraWQiOiJucGdZc0twSzI1dHF3VkNSamJZUzdUdFwvVERWc1UxYnFWbFwvMkkxcFJUTE09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3NjFlOTI5MC1lMDIxLTcwNGYtYTc0Zi02NDdjZmFiMWVlYmUiLCJjb2duaXRvOmdyb3VwcyI6WyJldS1zb3V0aC0xX1dkTnNoV1VTVl9Hb29nbGUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvZXUtc291dGgtMV9XZE5zaFdVU1YiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzMzFsc2RpdXM0OXBkOTU3bjk2Z2pzbDJvayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MDcyOTc0NjAsImV4cCI6MTcwNzM4Mzg2MCwiaWF0IjoxNzA3Mjk3NDYwLCJqdGkiOiIzMmRjNTE4ZC1iYTYwLTRmNWUtYTc2My00OGRiMmJhMmQyMzgiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMDA5NDY3NjU0NDIyMjI5NzI3MTIifQ.H2v6oiiaiUpQd9as_67skVK1UcdIbk02J8AXoo5lGQs4RZTYtTYvGUXXLFO6nW9VTQZmBQ1dlRbQhF-Yu9Hmdt6USBvCQMe9EgvNaJbGffDwesN--8VS9j-lP4jlV5JRKAP7fmL5Kc_K0wM5JuzIXYVHaVou9x9N_St2FmWYNBo9rPHUSdq7ripPV_H8zAwuDps-ZanDBZinlZsKlGmw-gfhZIQh4QLCkqq6eDLRruiYj7YL_kJpurBlo5a6o-Nc--sIs4nzdCvDJp0RhWmPPX7RrPA_yEWv7QWM69xn_ZPmrm0RbYgcEeXds3EJT0C8xGQ7m5XQjoKFloHoJxMXAQ&id_token=eyJraWQiOiJ5Uk92cjRsa2dmb3U1UURCZGM1RzI5cEtSVWxyRHVONW9oSTN2a0padXFVPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiVTl6a2JYbUJvZFQ1Z2t6TjNjZ2w4USIsInN1YiI6Ijc2MWU5MjkwLWUwMjEtNzA0Zi1hNzRmLTY0N2NmYWIxZWViZSIsImNvZ25pdG86Z3JvdXBzIjpbImV1LXNvdXRoLTFfV2ROc2hXVVNWX0dvb2dsZSJdLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2V1LXNvdXRoLTFfV2ROc2hXVVNWIiwiY29nbml0bzp1c2VybmFtZSI6Ikdvb2dsZV8xMDA5NDY3NjU0NDIyMjI5NzI3MTIiLCJub25jZSI6IlVKM0s5NEhTT0hwWHpDUXREVno2QkdfUm8xUXkzZEgyMll5Tklya202X2F5SmNZM05KZG5CTG9BNWVyQWdkZTRlOUpXT2VwYkVzS29ZSzRZMmdTMmh4RjBNajFmQnFVUkJ2MGxrSm9xZGI2aEdCNzExblpFc0ZtcTNhbk9UT3RCNXFjaDR3LThyaFIyLUlPNUYtS1ZScVVTWDZQdE1EbFhfNGNmemwxLVJlYyIsImF1ZCI6IjMzMWxzZGl1czQ5cGQ5NTduOTZnanNsMm9rIiwiaWRlbnRpdGllcyI6W3siZGF0ZUNyZWF0ZWQiOiIxNzA3Mjk3MzY3NTIyIiwidXNlcklkIjoiMTAwOTQ2NzY1NDQyMjIyOTcyNzEyIiwicHJvdmlkZXJOYW1lIjoiR29vZ2xlIiwicHJvdmlkZXJUeXBlIjoiR29vZ2xlIiwiaXNzdWVyIjpudWxsLCJwcmltYXJ5IjoidHJ1ZSJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDcyOTc0NjAsImV4cCI6MTcwNzM4Mzg2MCwiaWF0IjoxNzA3Mjk3NDYwLCJqdGkiOiI1Y2NlMDAxMS00ZWU5LTQxM2QtOGRlZi0yODUwNzUxOGM0ODQiLCJlbWFpbCI6ImdpdXNlcHBlLmRlbWFpb0BwYWdvcGEuaXQifQ.Laax2dnc16-FfY8vw-G3KiL41mxI03utnUD9uasKJugjPbcFwe4nypkqIgo8fKixTtdmpEi-dXmoY-LlZK41-HpqDn0W3xVNnD11lkm3Sxcoaw_rNnzMKHJBvVKUrJj7wSiL8EbkoaRg82_PFLwoBlmk7ZeV9G8ur5sYujr7JujFoGy1aydVOtAtxcYIzfyOmHdEKBp_0F0RkTw5cYqk9NWvA8kz_a1uvhQHAWKEa28f2J6VeiUPt58bcFRkplNxFUHKz4FpsaczTH0Ha6AUUHhQdB-v6HuHAFM4re7zgoseBOqwt2cejH51OjvhvBKoOJSQf-A2B6ppU1pv_f35yg&token_type=Bearer&expires_in=86400',
      },
      writable: true,
    });

    render(
      <Ctx.Provider value={{ setLogged }}>
        <BrowserRouter>
          <LoginPageCallback />
        </BrowserRouter>
      </Ctx.Provider>
    );
  });
});
