import React, { useCallback, useEffect, useState } from 'react'
import { Icon, Autocomplete, Thumbnail } from '@shopify/polaris'
import { SearchMinor, ImageMajor } from '@shopify/polaris-icons'
import { useLazyQuery } from '@apollo/client'
import { OptionDescriptor } from '@shopify/polaris/dist/types/latest/src/components/OptionList'

import IBaseMovie from '../../../models/BaseMovie'
import { MOVIE_SEARCH } from '../../../graphQL/queries'

const queryLimit = 2
const baseOptions: OptionDescriptor[] = [
  {
    value: 'Example',
    label: 'Example: Guardians of the Galaxy',
    disabled: true,
  },
]

const Search = (): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<OptionDescriptor[]>(baseOptions)
  const [isLoading, setIsLoading] = useState(false)
  const [baseMovieSearch, { data }] = useLazyQuery(MOVIE_SEARCH, {
    variables: { title: inputValue },
  })

  useEffect(() => {
    if (data) {
      const movieOptions: IBaseMovie[] = data.baseMovieSearch
      let optionsArray: OptionDescriptor[]
      if (movieOptions) {
        optionsArray = movieOptions.map((movieOption) => ({
          value: movieOption.imdbID,
          label: `${movieOption.Title} (${movieOption.Year})`,
          media: (
            <Thumbnail
              source={
                movieOption.Poster !== 'N/A' ? movieOption.Poster : ImageMajor
              }
              alt={movieOption.Title}
            />
          ),
        }))
      } else {
        optionsArray = [
          {
            value: 'Error',
            label: 'Unable to find movies matching this search query',
            disabled: true,
          },
        ]
      }
      setOptions(optionsArray)
      setIsLoading(false)
    }
  }, [data])

  const updateText = useCallback(
    async (value: string) => {
      setInputValue(value)

      if (value === '') {
        setIsLoading(true)
        setOptions(baseOptions)
        setIsLoading(false)
      } else if (value.length % queryLimit === 0) {
        setIsLoading(true)
        baseMovieSearch()
      }
    },
    [baseMovieSearch],
  )

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem: any) => {
        const matchedOption = options.find((option) => option.value.match(selectedItem))
        return matchedOption && matchedOption.label
      })

      setSelectedOptions(selected)
      setInputValue(selectedValue)
    },
    [options],
  )

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  )
  return (
    <div style={{ height: '225px' }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
        loading={isLoading}
      />
    </div>
  )
}

export default Search
