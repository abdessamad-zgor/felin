import { describe, expect, test } from "vitest";
import { FDocument, div } from "../dist/felin.js";

describe("test FDocument module", ()=>{
  test("test render", ()=>{
    let element = div()
    let fdocument = new FDocument()
    fdocument.render("#root", element)
    expect(fdocument.rootSelector).eq("#root")
    expect(fdocument.rootElement).eq(element._id)
  })
})
