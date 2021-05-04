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
import { setMovieList, showMovieList } from "../../../actions";
import GenericOutputs from "../../../models/GenericOutputs";

const queryLimit = 2;
const genericOutputs = new GenericOutputs();

const Search = (): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<OptionDescriptor[]>(genericOutputs.errorOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [baseMovieSearch, { data }] = useLazyQuery(MOVIE_SEARCH, {
    variables: { title: inputValue },
  });

  const keypressHandler = (e: KeyboardEvent): void => {
    if (e.code === "Enter") {
      baseMovieSearch();
      dispatch(showMovieList());
    }
  };

  useEffect(() => {
    let optionsArray: OptionDescriptor[];
    if (data?.baseMovieSearch) {
      const movieOptions: IBaseMovie[] = data.baseMovieSearch.filter(
        (dataIndex: IBaseMovie) => {
          return dataIndex.Type === "movie";
        },
      );
      if (movieOptions) {
        dispatch(setMovieList(movieOptions));
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
        dispatch(setMovieList(genericOutputs.errorMovieList));
        optionsArray = genericOutputs.errorOptions;
      }
    } else {
      optionsArray = genericOutputs.errorOptions;
      if (data) {
        dispatch(setMovieList(genericOutputs.errorMovieList));
      }
    }
    setOptions(optionsArray);
    return () => setIsLoading(false);
  }, [data, dispatch]);

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
    <div onKeyPress={(e) => keypressHandler(e)} style={{ height: "10vh" }}>
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
