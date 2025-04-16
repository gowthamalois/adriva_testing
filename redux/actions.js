import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiServices from "../services/api";
import magicJson from "../magicJson/magicJson";
import pako from "pako";
const inialState = {
  data: [],
  mappingdata: [],
  token: "",
  metaData: {},
  blogdata: [],
  collectioncount: 0,
  jobsdata: [],
  loading: false,
  jobscount: 0,
  socketdata: [],
  ispreview: false,
  selectedlanguage:"en"
};
const services = new apiServices();

export const fetchdataApi = createAsyncThunk(
  "/services",
  async (payload, { dispatch }) => {
    // Prepare the request
    const { id, pagination, slug, isjobs, data, socketdata, ispreview,language } =
      payload;
      
    if (ispreview==true) {
      const transformedData = socketdata[0][0][id]
      console.log(transformedData,"transformedData")
      const metaData = JSON.parse(
        pako.inflate(
          Uint8Array.from(
            atob(
              btoa(
                String.fromCharCode(
                  ...new Uint8Array(
                    pako.gzip(
                      JSON.stringify(
                        socketdata[0][0].metadata
                          
                      )
                    )
                  )
                )
              )
            ),
            (c) => c.charCodeAt(0)
          ),
          { to: "string" }
        )
      );
      console.log(transformedData,"transformedData")
      dispatch(loading(false));
      dispatch(previewmappingdata(transformedData))
      return { mappedData: transformedData, metaData }; 
    }
    else{
      magicJson.endpoint = "contentManager"
      magicJson.executor = "getFlattenedData"
      magicJson.data = {id,language}
      const Data = new FormData();
      Data.append("request", JSON.stringify(magicJson));
      const res = await services
        .fetchdata(Data)
        .catch(() => dispatch(loading(false)));
      return {mappedData:res.data.data[0][id],metaData:res.data.data[0]?.metadata
      }
    }
  }
  
);
const fetchdata = createSlice({
  name: "data",
  initialState: inialState,
  reducers: {
    fetch_data: (state, action) => {
      state.token = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setblogdata: (state, action) => {
      state.blogdata = action.payload;
    },
    countblog: (state, action) => {
      state.collectioncount = action.payload;
    },
    insertjobs: (state, action) => {
      state.jobsdata = action.payload;
    },
    countjobs: (state, action) => {
      state.jobscount = action.payload;
    },
    insertpreviewdata: (state, action) => {
      state.socketdata = action.payload;
    },
    ispreview: (state, action) => {
      state.ispreview = action.payload;
    },
    resetdata:(state)=>{
      state.data=[];
      state.mappingdata=[];
      state.token="";
      state.metaData={};
      state.blogdata=[];
      state.collectioncount=0;
      state.jobsdata=[];
      state.loading=false;
      state.jobscount=0;
      state.socketdata=[];
      state.ispreview=false;
    },
    previewmappingdata:(state,action)=>{
      state.mappingdata = action.payload
    },
    changelanguage:(state,action)=>{
      state.selectedlanguage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchdataApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchdataApi.fulfilled, (state, action) => {
        state.loading = false;
        state.metaData = action.payload.metaData;
        state.mappingdata = action.payload.mappedData; // Update mappingdata in state
        state.data.push(action.payload.mappedData);
      })
      .addCase(fetchdataApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch data";
      });
  },
});


export const {
  fetch_data,
  loading,
  setblogdata,
  countblog,
  insertjobs,
  countjobs,
  insertpreviewdata,
  ispreview,
  previewmappingdata,
  resetdata,
  changelanguage
} = fetchdata.actions;

export const fetchdataReducer = fetchdata.reducer;
