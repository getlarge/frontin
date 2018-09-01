import Vue from "vue";
import { mutations } from "@/store/home";

const { updateHomeCounter } = mutations;

describe("mutations", () => {
    it("INCREMENT", () => {
        // mock state
        const state = { updateCounter: 0 };
        // apply mutation
        updateHomeCounter(state, 1);
        // assert result
        expect(state.updateCounter).toEqual(1);
    });
});
