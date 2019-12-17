import { expect } from "chai";
// tslint:disable-next-line:no-import-side-effect
import "isomorphic-fetch";
// tslint:disable-next-line:no-import-side-effect
import "mocha";

import { JsonBinBasedTodoApi } from "../src/api/api";
import { ITodoApi } from "../src/api/ITodoApi";

async function clearTodos(api: ITodoApi): Promise<void> {
    await api.setTodos({});
}

describe("Get", () => {
    it("should return correct data", async () => {
        const api = new JsonBinBasedTodoApi("5dd9060c040d843991f79576");
        const response = await api.getTodos();
        expect(response).eql({});
    });

    it("should return correct data", async () => {
        const api = new JsonBinBasedTodoApi("5dd9060c040d843991f79576");
        const response = await clearTodos(api);
        expect(response).eql({});
    });
});
