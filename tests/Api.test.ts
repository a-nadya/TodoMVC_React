import { expect } from "chai";
// tslint:disable-next-line:no-import-side-effect
import "isomorphic-fetch";
// tslint:disable-next-line:no-import-side-effect
import "mocha";

import { api } from "../src/api/api";

describe("Get", () => {
    it("should return correct data", async () => {
        const response = await api.select();
        expect(response).eql({});
    });
});
