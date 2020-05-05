import re
from elasticsearch.exceptions import RequestError

from engine.models import Document, Page
from engine.documents import PageDocument

def elastic_search(doc_name, query):
    try: 
        res = {doc_name: {}}
        query_string = f'doc_name:"{doc_name}" AND text:({query})'
        print(f'elastic search query string <{query_string}>')
        for page in PageDocument.search().query('query_string', query=query_string): 
            if page.doc_name not in res:
                res[page.doc_name] = {}
            res[doc_name][page.num] = page.url
        return res
    except RequestError as e:
        print(e)
        return {"error": True, "text": "invalid query syntax"}


def slow_search(doc_name, query):
    try:
        keywords = query.split() 
        print(keywords)
        patterns = [re.compile(r'\b{}\b'.format(word), re.IGNORECASE) for word in keywords]
        print(patterns)
        documents = Document.objects.filter(name=doc_name)
        print(documents)

        results = dict()
        for document in documents:
            found_in_document = dict()
            pages = document.pages
            for page in pages:
                has_all_words = all(p.search(page.text) for p in patterns)
                if has_all_words:
                    found_in_document[page.num] = page.url
            results[document.name] = found_in_document
        return results
    except Exception as e:
        print(e)
