import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import * as module from "../../proxy/index"; //Do not change namespace import

let RoleService: any = module.RoleService;
let UserService: any = module.UserService;
let OrganizationUnitService: any = module.OrganizationUnitService;

type InitialState = {
  organizationUnitTree: any;
  members: any;
  availableUsers: any;
  roles: any;
  availableRoles: any;
  rolesList: any;
  usersList: any;
  error: string;
  status: "pending" | "loading" | "error" | "success";
};

export const initialState: InitialState = {
  organizationUnitTree: [],
  members: null,
  availableUsers: null,
  roles: null,
  availableRoles: null,
  rolesList: null,
  usersList: null,
  error: "",
  status: "pending",
};

//organization unit
export const fetchOrganizationTrees = createAsyncThunk(
  "OrganizationTree/fetchOrganizationTrees",
  () => {
    return OrganizationUnitService?.getOrganizationUnitsAll().then(
      (result: any) => {
        return result;
      }
    );
  }
);

export const addOrganizationUnit = createAsyncThunk(
  "OrganizationTree/addOrganizationUnit",
  (data: any) => {
    const result = OrganizationUnitService?.postOrganizationUnits({
      requestBody: data,
    });
    return result;
  }
);

export const editOrganizationUnit = createAsyncThunk(
  "OrganizationTree/editOrganizationUnit",
  ({ id, dTo }: { id: any; dTo: any }) => {
    const result = OrganizationUnitService?.putOrganizationUnits({
      id: id,
      requestBody: dTo,
    });
    return result;
  }
);

export const deleteOrganizationUnit = createAsyncThunk(
  "OrganizationTree/deleteOrganizationUnit",
  (id: any) => {
    const result = OrganizationUnitService?.deleteOrganizationUnits({ id: id });
    return result;
  }
);

//member actions
export const fetchMemberOrganizationTrees = createAsyncThunk(
  "OrganizationTree/fetchMemberOrganizationTrees",
  async (id: any) => {
    return OrganizationUnitService?.getOrganizationUnitsMembers({
      id: id,
      filter: undefined,
      roleId: undefined,
      organizationUnitId: undefined,
      userName: undefined,
      phoneNumber: undefined,
      emailAddress: undefined,
      isLockedOut: undefined,
      notActive: undefined,
      sorting: undefined,
      skipCount: 0,
      maxResultCount: 1000,
    }).then((result: any) => {
      return result.items;
    });
  }
);

export const deleteMemberOrganizationUnit = createAsyncThunk(
  "OrganizationTree/deleteMemberOrganizationUnit",
  ({ id, memberId }: { id: any; memberId: any }) => {
    const result = OrganizationUnitService?.deleteOrganizationUnitsMembers({
      id: id,
      memberId: memberId,
    });
    return result;
  }
);

export const editMemberOrganizationUnit = createAsyncThunk(
  "OrganizationTree/editMemberOrganizationUnit",
  ({ id, dTo }: { id: any; dTo: any }) => {
    const result = OrganizationUnitService?.putOrganizationUnitsMembers({
      id: id,
      requestBody: dTo,
    });
    return result;
  }
);

export const FetchUsersOrganizationUnit = createAsyncThunk(
  "OrganizationTree/FetchUsersOrganizationUnit",
  () => {
    return UserService?.getUsers1({
      filter: undefined,
      roleId: undefined,
      organizationUnitId: undefined,
      userName: undefined,
      phoneNumber: undefined,
      emailAddress: undefined,
      isLockedOut: undefined,
      notActive: undefined,
      sorting: undefined,
      skipCount: 0,
      maxResultCount: 1000,
    }).then((result: any) => {
      return result.items;
    });
  }
);

export const GetOrganizationUnitsAvailableUsers = createAsyncThunk(
  "OrganizationTree/GetOrganizationUnitsAvailableUsers",
  (data: any) => {
    return OrganizationUnitService?.getOrganizationUnitsAvailableUsers({
      filter: undefined,
      id: data.id,
      sorting: undefined,
      skipCount: 0,
      maxResultCount: 100,
    }).then((result: any) => {
      return result.items;
    });
  }
);

//Roles actions
export const fetchRolesOrganizationTrees = createAsyncThunk(
  "OrganizationTree/fetchRolesOrganizationTrees",
  async (id: any) => {
    return OrganizationUnitService?.getOrganizationUnitsRoles({
      id: id,
      sorting: undefined,
      skipCount: 0,
      maxResultCount: 1000,
    }).then((result: any) => {
      return result.items;
    });
  }
);

export const deleteRolesOrganizationUnit = createAsyncThunk(
  "OrganizationTree/deleteRolesOrganizationUnit",
  ({ id, roleId }: { id: any; roleId: any }) => {
    const result = OrganizationUnitService?.deleteOrganizationUnitsRoles({
      id,
      roleId,
    });
    return result;
  }
);

export const editRolesOrganizationUnit = createAsyncThunk(
  "OrganizationTree/editRolesOrganizationUnit",
  ({ id, dTo }: { id: any; dTo: any }) => {
    const result = OrganizationUnitService?.putOrganizationUnitsRoles({
      id: id,
      requestBody: dTo,
    });
    return result;
  }
);

export const FetchRoleListOrganizationUnit = createAsyncThunk(
  "OrganizationTree/FetchRoleListOrganizationUnit",
  () => {
    return RoleService?.getRoles1({
      filter: undefined,
      sorting: undefined,
      skipCount: 0,
      maxResultCount: 1000,
    }).then((result: any) => {
      return result.items;
    });
  }
);

export const GetOrganizationUnitsAvailableRoles = createAsyncThunk(
  "OrganizationTree/GetOrganizationUnitsAvailableRoles",
  (data: any) => {
    return OrganizationUnitService?.getOrganizationUnitsAvailableRoles({
      filter: undefined,
      id: data.id,
      sorting: undefined,
      skipCount: 0,
      maxResultCount: 100,
    }).then((result: any) => {
      return result.items;
    });
  }
);

const OrganizationTreeSlice = createSlice({
  name: "OrganizationTree",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //organization unit reducer
    builder.addCase(fetchOrganizationTrees.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchOrganizationTrees.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        debugger
        state.organizationUnitTree = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchOrganizationTrees.rejected, (state, action) => {
      state.status = "error";
      state.organizationUnitTree = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      deleteOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.error = "";
      }
    );
    builder.addCase(deleteOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(editOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      editOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.organizationUnitTree = action.payload;
        state.error = "";
      }
    );
    builder.addCase(editOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.organizationUnitTree = [];
      state.error = action.error.message || "Something Went Wrong";
    });

    //Member unit reducer
    builder.addCase(fetchMemberOrganizationTrees.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchMemberOrganizationTrees.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.members = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchMemberOrganizationTrees.rejected, (state, action) => {
      state.status = "error";
      state.members = null;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteMemberOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      deleteMemberOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.error = "";
      }
    );
    builder.addCase(deleteMemberOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(editMemberOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      editMemberOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.error = "";
      }
    );
    builder.addCase(editMemberOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(FetchUsersOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      FetchUsersOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.usersList = "success";
        state.usersList = action.payload;
        state.error = "";
      }
    );
    builder.addCase(FetchUsersOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.usersList = [];
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(GetOrganizationUnitsAvailableUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      GetOrganizationUnitsAvailableUsers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.availableUsers = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      GetOrganizationUnitsAvailableUsers.rejected,
      (state, action) => {
        state.status = "error";
        state.availableUsers = null;
        state.error = action.error.message || "Something went wrong";
      }
    );

    //Roles unit reducer
    builder.addCase(fetchRolesOrganizationTrees.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchRolesOrganizationTrees.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.roles = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchRolesOrganizationTrees.rejected, (state, action) => {
      state.status = "error";
      state.roles = null;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteRolesOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      deleteRolesOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.error = "";
      }
    );
    builder.addCase(deleteRolesOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(editRolesOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      editRolesOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.error = "";
      }
    );
    builder.addCase(editRolesOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(FetchRoleListOrganizationUnit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      FetchRoleListOrganizationUnit.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.rolesList = action.payload;
        state.error = "";
      }
    );
    builder.addCase(FetchRoleListOrganizationUnit.rejected, (state, action) => {
      state.status = "error";
      state.rolesList = [];
      state.error = action.error.message || "Something Went Wrong";
    });
    builder.addCase(GetOrganizationUnitsAvailableRoles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      GetOrganizationUnitsAvailableRoles.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "success";
        state.availableRoles = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      GetOrganizationUnitsAvailableRoles.rejected,
      (state, action) => {
        state.status = "error";
        state.availableRoles = null;
        state.error = action.error.message || "Something went wrong";
      }
    );
  },
});
export default OrganizationTreeSlice.reducer;
