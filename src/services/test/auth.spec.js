import mockAxios from "axios";
import AuthService from "../auth";

jest.mock("axios");

describe("auth services", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Login com sucesso", async () => {
    const token = "12346789Oi";
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } });
    });

    const response = await AuthService(mockAxios).login({
      email: "igor@igor.me",
      password: "1234",
    });
    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot();
  });

  it('Retornando dados do login', async () => {
    const user = {
      name: 'Igor',
      password: '1234',
      email: 'igor@igor.me'
    }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register(user)
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('password')
    expect(response.data).toHaveProperty('email')
    expect(response).toMatchSnapshot()
  })

  it('Erro no login', async () => {
    const errors = { status: 404, statusText: 'Not Found' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).login({ email: 'igor@igor.me', password: '123' })
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
});
