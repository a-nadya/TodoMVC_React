import { expect } from "chai";
// tslint:disable-next-line:no-import-side-effect
import "isomorphic-fetch";
// tslint:disable-next-line:no-import-side-effect
import "mocha";

import { Api } from "../src/api/Api";

describe("select", () => {
    it("should return error if binId is incorrect", async () => {
        const api = new Api("757590475757");
        await expect(api.select()).to.throw;
    });

    it("should return correct data", async () => {
        const api = new Api("5e008e18bda54254c5f17a4f");
        const response = await api.select();
        expect(response).eql({
            "12345": {
                text: "text1",
                active: true,
            },
            "2138777657": {
                text: "text2",
                active: true,
            },
        });
    });

    it("should return entity Empty if list of todo is empty", async () => {
        const api = new Api("5e00b1f7ec09451045d7bec2");
        const response = await api.select();
        expect(response).eql({
            empty: true,
        });
    });
});

describe("update", () => {
    it("should return error if binId is incorrect", async () => {
        const api = new Api("1234543456");
        await expect(
            api.update({
                "12345": {
                    text: "text1",
                    active: true,
                },
                "2138777657": {
                    text: "text2",
                    active: true,
                },
            })
        ).to.throw;
    });

    it("should return nothing if update was success", async () => {
        const api = new Api("5e035fa332ac62710773869e");
        const response = await api.update({
            "11111": {
                text: "new",
                active: false,
            },
        });
        expect(response).eql(undefined);
        expect(await api.select()).eql({
            "11111": {
                text: "new",
                active: false,
            },
        });
    });

    it("should set entity Empty if list of todo is empty", async () => {
        const api = new Api("5e0360bde3eeeb70eb967cf8");
        const response = await api.update({});
        expect(response).eql(undefined);
        expect(await api.select()).eql({
            empty: true,
        });
    });
});
