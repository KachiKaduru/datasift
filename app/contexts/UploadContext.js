"use client";
import { createContext, useReducer, useMemo, useCallback, useContext } from "react";
import * as XLSX from "xlsx";

const initialState = {
  data: [],
  filteredData: [],
  fileName: "",
  filters: {},
  isLoading: false,
  error: null,
};

const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_DATA: "SET_DATA",
  SET_FILENAME: "SET_FILENAME",
  SET_FILTERS: "SET_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
  RESET_ALL: "RESET_ALL",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTIONS.SET_DATA:
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload,
        isLoading: false,
        error: null,
      };
    case ACTIONS.SET_FILENAME:
      return {
        ...state,
        fileName: action.payload,
      };
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: action.payload.filters,
        filteredData: filterData(state.data, action.payload.filters),
      };
    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: {}, filteredData: state.data };
    case ACTIONS.RESET_ALL:
      return initialState;
    default:
      return state;
  }
}

const filterData = (data, filters) => {
  if (!data.length || !Object.keys(filters).length) return data;
  return data.filter((row) => {
    return Object.entries(filters).every(([column, value]) => {
      if (!value) return true;
      return String(row[column] || "")
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  });
};

export const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoized actions
  const uploadFile = useCallback(async (file) => {
    if (!file) return;
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    try {
      const jsonData = await readFile(file);
      dispatch({ type: ACTIONS.SET_DATA, payload: jsonData });
      dispatch({ type: ACTIONS.SET_FILENAME, payload: file.name });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: { filters } });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_ALL });
  }, []);

  // Context value
  const contextValue = useMemo(
    () => ({
      ...state,
      actions: {
        uploadFile,
        setFilters,
        resetFilters,
        resetAll,
      },
    }),
    [state, uploadFile, setFilters, resetFilters, resetAll]
  );

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result);
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          resolve(XLSX.utils.sheet_to_json(firstSheet));
        } catch (error) {
          reject(new Error("Invalid file format"));
        }
      };
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsArrayBuffer(file);
    });
  };

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}

// Custom hook
export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) throw new Error("useUpload must be used within UploadProvider");
  return context;
}
