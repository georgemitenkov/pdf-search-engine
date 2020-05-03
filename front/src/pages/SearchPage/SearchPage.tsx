import * as React from 'react';
import {cn} from "@bem-react/classname";

import SearchForm from "../../components/SearchForm/SearchForm";
import {
  SearchResponse,
  SearchRequest,
  GetComponentNamesRequest,
  ComponentNames
} from "../../utils/apiTypes";
import SearchResult from "../../components/SearchResult/SearchResult";

import './SearchPage.css';

interface SearchPageProps {
  sendData: (searchRequest: SearchRequest) => Promise<SearchResponse>;
  getComponentNames: (getComponentNamesRequest?: GetComponentNamesRequest) => Promise<ComponentNames>;
}

interface SearchPageState {
  searchResponse: SearchResponse;
  componentNames: ComponentNames;
}

const cnSearchPage = cn('SearchPage');

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props)
    this.state = {
      searchResponse: {},
      componentNames: [],
    }
  }

  sendData = async (searchRequest: SearchRequest) => {
    const searchResponse = await this.props.sendData(searchRequest)
    this.setState({searchResponse})
  }

  getComponentNames = async () => {
    const componentNames = await this.props.getComponentNames()
    this.setState({componentNames})
  }

  render() {
    const {
      state: {
        searchResponse,
        componentNames,
      },
      sendData,
      getComponentNames,
    } = this;

    const components = Object.keys(searchResponse);

    return (
      <div className={cnSearchPage()}>
        <h4>Search for information about electronic components</h4>
        <SearchForm
          {...{
            sendData,
            getComponentNames,
            componentNames,
          }}
        />
        {
          components.length !== 0 && <SearchResult
              searchResponse={searchResponse}
          />
        }
      </div>
    )
  }
}

export default SearchPage;
