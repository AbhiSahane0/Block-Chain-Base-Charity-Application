import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "534910273d32d64fe471543b28d4127d";

export const client = createThirdwebClient({
  clientId: clientId,
});
