const { test, expect, it } = require("@jest/globals");
const frisby = require("frisby");

const api_url = "https://script.google.com/macros/s/AKfycbyWm1LMHpwdcoAf7nt0Q_mf3m9H_YK8OL9Z14iZVab7EHNuRGZhZbF6RfYp2tPfJgs/exec";

//正常系
test('GAS APIテスト:正常系', async () => {
    const res = await frisby.post(api_url, {
        body: "email=test@test.test&body=foooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("受け付けました");
})

//Email不正
it('GAS APIテスト:Email不正', async () => {
    const res = await frisby.post(api_url, {
        body: "email=test&body=fooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("エラーです");
})

//お問い合わせ不正
it('GAS APIテスト:お問い合わせ不正', async () => {
    const res = await frisby.post(api_url, {
        body: "email=test@test.com&body=foooooooooo&channel=unit-test",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    expect(res._body).toBe("エラーです");
})