/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Icon, Autocomplete } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useLazyQuery } from "@apollo/client";
import { OptionDescriptor } from "@shopify/polaris/dist/types/latest/src/components/OptionList";

import { useDispatch } from "react-redux";
import IBaseMovie from "../../models/interfaces/BaseMovie";
import { MOVIE_SEARCH } from "../../graphQL/queries";
import reduxActions from "../../models/classes/ReduxActions";
import genericOutputs from "../../models/classes/GenericOutputs";
import "./Search.css";

const Search: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<OptionDescriptor[]>(
    genericOutputs.errorOptions,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [baseMovieSearch, { data }] = useLazyQuery(MOVIE_SEARCH, {
    variables: { title: inputValue },
  });

  // when text is updated, query graphql for new autocomplete and movie list
  useEffect(() => {
    baseMovieSearch();
  }, [inputValue, baseMovieSearch]);

  // side effect for when graphql query completes
  useEffect(() => {
    let optionsArray: OptionDescriptor[];

    // check if data exists
    if (data?.baseMovieSearch) {
      // remove all options that are not movies
      const movieOptions: IBaseMovie[] = data.baseMovieSearch.filter(
        (dataIndex: IBaseMovie) => {
          return dataIndex.Type === "movie";
        },
      );

      // null check
      if (movieOptions) {
        // set redux state (for use later) and autocomplete options to query results
        dispatch(reduxActions.setMovieList(movieOptions));
        optionsArray = movieOptions.map((movieOption) => ({
          value: movieOption.imdbID,
          label: `${movieOption.Title} (${movieOption.Year})`,
        }));
      } else {
        // error options
        dispatch(reduxActions.setMovieList([]));
        if (inputValue === "") {
          optionsArray = genericOutputs.initOptions;
        } else {
          optionsArray = genericOutputs.errorOptions;
        }
      }
    } else {
      // error options
      if (inputValue === "") {
        optionsArray = genericOutputs.initOptions;
      } else {
        optionsArray = genericOutputs.errorOptions;
      }
      if (data) {
        dispatch(reduxActions.setMovieList([]));
      }
    }
    setOptions(optionsArray); // set autocomplete options
    dispatch(reduxActions.showMovieList()); // update movie list
    return () => setIsLoading(false); // cleanup
  }, [data, inputValue, dispatch]);

  // callback for when user tyes into the search bar
  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);
      // loading sequence
      setIsLoading(true);
      // query graphql
      baseMovieSearch();
    },
    [baseMovieSearch],
  );

  // callback for if user selects an autocomplete option
  const updateSelection = useCallback(
    (selected) => {
      // find the selected label
      const selectedLabel: OptionDescriptor[] = selected.map(
        (selectedItem: string) => {
          const matchedOption = options.find((option) => option.value.match(selectedItem));
          return matchedOption;
        },
      );

      // split label into valid graphql search query
      const removeAfter = (selectedLabel[0].label as string).indexOf("(");
      const returnInput = (selectedLabel[0].label as string)
        .substring(0, removeAfter)
        .trim();

      // set selected and input options
      setSelectedOptions(selected);
      if (returnInput && returnInput !== "") {
        setInputValue(returnInput);
      }
    },
    [options],
  );

  // keyboard support for ease of use with the autocomplete searcher
  const keypressHandler = useCallback(
    (e: any): void => {
      if (e.code === "Enter") {
        setOptions([]); // clear options
      }
    },
    [],
  );

  // autocomplete textfield
  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );
  return (
    <div
      onKeyPress={keypressHandler}
      className="searchContainer"
    >
      <div className="border">
        <Autocomplete
          options={options}
          selected={selectedOptions}
          onSelect={updateSelection}
          textField={textField}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Search;
