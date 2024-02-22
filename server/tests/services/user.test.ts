import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

// import services
import {
  createUser,
  fetchUser,
  saveUser,
  updateUserToken,
  checkUser,
} from "../../services/db";
import { validateToken } from "../../services/google-login";

// import db
import { connect } from "../../db/connect";
import User, { IUser } from "../../db/user";
import { updateNames } from "../../services/user";
import exp from "constants";

describe("Testing db services", () => {
  const testToken = process.env.DEBUG_GOOGLE_TOKEN;

  beforeAll(async () => {
    await connect("testDBServices");
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing user create, save, and fetch", async () => {
    const userData = await validateToken(testToken);
    const user = await createUser(userData, testToken);
    const newUser = {
        
    }
    expect.any(User);

    try {
      await saveUser(user);
    } catch (error) {
      console.error(error);
    }
    const fetchedUser = await fetchUser(user.id);

    expect(fetchedUser.id).toBe(user.id);
  });

  test("Testing user create with insufficient data", async () => {
    const userData = await validateToken(testToken);
    userData.family_name = undefined;
    const user = await createUser(userData, testToken);
    let error;
    try {
      await saveUser(user);
    } catch (err) {
      error = err;
    }
    expect(error.message).toBe("User validation failed: familyName: Path `familyName` is required.");
  });

  test("Testing updateUserToken", async () => {
    const userData = await validateToken(testToken);
    const user = await createUser(userData, testToken);

    try {
      await saveUser(user);
    } catch (error) {
      console.error(error);
    }

    const newToken = "new token";
    const updatedUser = await updateUserToken(
      process.env.DEBUG_EMAIL,
      newToken
    );
    expect(updatedUser.token).toBe(newToken);
  });

  test("Testing check user", async () => {
    const userData = await validateToken(testToken);
    const user = await createUser(userData, testToken);

    try {
      await saveUser(user);
    } catch (error) {
      console.error(error);
    }

    const existEmail = process.env.DEBUG_EMAIL;
    const notExistEmail = "this is an email that does not exist";
    const shouldExist = await checkUser(existEmail);

    expect(shouldExist).toEqual({ _id: user._id });
    const shouldNotExist = await checkUser(notExistEmail);
    expect(shouldNotExist).toBe(null);
  });

  test("Testing update names",async () => {
    const user = new User({
      name: "lizzy",
      username: "ekane",
      givenName:"Liz",
      middleName:"M",
      familyName: "Kane",
      email: "lkane0705@gmail.com",
      emailVerified: true,
      onboarded: false,
      token: testToken,
      profileImgUrl:"https://lh3.googleusercontent.com/a/ACg8ocL_uQ8RLVUoETOMcVC-bR8FeAcBEH4ffgaKhk9x5smPEPk=s96-c",
    })

    const savedUser = await user.save();
    
    updateNames("lkane0705@gmail.com", "lkane0705", "Elizabeth", "M", "K");
    const testUser = await User.findOne({email: "lkane0705@gmail.com"});
    expect(testUser.username).toBe("lkane0705");
    expect(testUser.givenName).toBe("Elizabeth");
    expect(testUser.familyName).toBe("K");
  });
});