import {loadData} from '../GetData';

global.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
        json: () => Promise.resolve({'id': 'test-id', 'name': 'test-name', 'email': 'test-email', 'role': 'test-role'})
    })
})

test("Testing API response", async () => {
    const actualResponse = await loadData();
    console.log(actualResponse);
    expect(actualResponse).not.toBeNull();
})