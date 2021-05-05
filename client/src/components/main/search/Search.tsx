/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  KeyboardEvent, useCallback, useEffect, useState,
} from "react";
import { Icon, Autocomplete, Thumbnail } from "@shopify/polaris";
import { SearchMinor, ImageMajor } from "@shopify/polaris-icons";
import { useLazyQuery } from "@apollo/client";
import { OptionDescriptor } from "@shopify/polaris/dist/types/latest/src/components/OptionList";

import { useDispatch } from "react-redux";
import IBaseMovie from "../../../models/BaseMovie";
import { MOVIE_SEARCH } from "../../../graphQL/queries";
import ReduxActions from "../../../actions";
import GenericOutputs from "../../../models/GenericOutputs";

const queryLimit = 2;
const genericOutputs = new GenericOutputs();
const reduxActions = new ReduxActions();

const Search = (): JSX.Element => {
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

  // detector for when graphql query completes
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

      if (movieOptions) {
        // null check
        // set redux state (for use later) and autocomplete options to query results
        dispatch(reduxActions.setMovieList(movieOptions));
        optionsArray = movieOptions.map((movieOption) => ({
          value: movieOption.imdbID,
          label: `${movieOption.Title} (${movieOption.Year})`,
          media: (
            <Thumbnail
              source={
                movieOption.Poster !== "N/A" ? movieOption.Poster : ImageMajor
              }
              alt={movieOption.Title}
            />
          ),
        }));
      } else {
        // error handling
        dispatch(reduxActions.setMovieList(genericOutputs.errorMovieList));
        optionsArray = genericOutputs.errorOptions;
      }
    } else {
      // error handling
      optionsArray = genericOutputs.errorOptions;
      if (data) {
        dispatch(reduxActions.setMovieList(genericOutputs.errorMovieList));
      }
    }
    setOptions(optionsArray); // set autocomplete options
    return () => setIsLoading(false);
  }, [data, dispatch]);

  // keyboard support for ease of use with the autocomplete searcher
  const keypressHandler = useCallback((e: KeyboardEvent): void => {
    if (e.code === "Enter") {
      // initial function to display on movie list card
      baseMovieSearch();
      dispatch(reduxActions.showMovieList());
    }
  }, [baseMovieSearch, dispatch]);

  // callback for when user tyes into the search bar
  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);
      if (value === "") {
        setIsLoading(true);
        setOptions(genericOutputs.initOptions);
        setIsLoading(false);
      } else if (value.length % queryLimit === 0) {
        setIsLoading(true);
        baseMovieSearch();
      }
    },
    [baseMovieSearch],
  );

  // callback for if user selects an autocomplete option
  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem: any) => {
        const matchedOption = options.find((option) => option.value.match(selectedItem));
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue);
    },
    [options],
  );

  // Template
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
    <div onKeyPress={keypressHandler} style={{ height: "10vh" }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
        loading={isLoading}
      />
    </div>
  );
};

export default Search;
