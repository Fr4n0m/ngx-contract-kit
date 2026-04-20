# Demo: Angular + Nest in 5 steps

## 1. Define the contract

```ts
// users.contract.ts
export const usersContract = {
  getUser: {
    method: "GET",
    path: "/users/:id",
    params: { id: "string" },
    response: {
      200: { id: "string", name: "string", email: "string" }
    }
  }
} as const;
```

## 2. Generate client + types

```bash
npx ngx-contract-kit generate
```

Output:

- `shared/types.ts`
- `angular/users.client.ts`
- `mocks/users.mock.ts`

## 3. Use generated Angular client

```ts
this.usersClient.getUser({ id: userId }).subscribe((user) => {
  this.user = user;
});
```

## 4. Use NestJS plugin

```ts
@Get(":id")
getUser(@Param() params: GetUserParams): Promise<GetUser200Response> {
  return this.usersService.getUser(params.id);
}
```

## 5. Protect CI from breaking changes

```bash
npx ngx-contract-kit check
```

If a contract change is incompatible, CI fails before merge.
