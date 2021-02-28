import useStore from "../../hooks/useStore";
import { setCurrentUser, resetUserStore, setApiKey, cleanCurrentUser } from "../user";

describe("UserStore", () => {
  afterEach(()=>{
    resetUserStore()
  })

  it("Definiçã do usuário atual", () => {
    const store = useStore();
    setCurrentUser({ name: "Diogo" });
    expect(store.User.currentUser.name).toBe("Diogo");
  });

  it("Geração do Api para o usuário currente", () => {
    const store = useStore()
    setApiKey("123")
    expect(store.User.currentUser.apiKey).toBe("123")
  })

  it("Limpar usuário atual", () => {
    const store = useStore();
    setCurrentUser({ name: "Diogo" });
    expect(store.User.currentUser.name).toBe("Diogo");
    cleanCurrentUser();
    expect(store.User.currentUser.name).toBeFalsy()
})
})