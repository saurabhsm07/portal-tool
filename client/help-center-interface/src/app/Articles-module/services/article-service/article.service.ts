import { Injectable } from '@angular/core';
import { Article } from '../../classes/article';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ArticleRequestErrorHandlersService } from '../error-handler-service/article-request-error-handlers/article-request-error-handlers.service'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  serverDomain = 'http://localhost:5000/' //base url of the serrer

  /**
   * List of primary CRUD APIs for Article Data
   */
  private requestUri = {
    getArticles:  this.serverDomain + 'api/articles/',                             // get all articles
    getArticlesWithSectionId:  this.serverDomain + 'api/articles/section/id/',     // get articles in section
    getArticleById:  this.serverDomain + 'api/articles/id/',                       // get article with specific id
    getLastArticleId:  this.serverDomain + 'api/articles/max/id',                  // get id of the last article created
    getArticleBySearchText:  this.serverDomain + 'api/articles/search?query=',
    postArticle:  this.serverDomain + 'api/articles/',                             // create article in db
    updateArticle:  this.serverDomain + 'api/articles/',                           // update article in db
    deleteArticle:  this.serverDomain + 'api/articles/id/',                        // delete article in db
};

  private headersOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
})
};

  constructor(private http: HttpClient) { }

  /**
   * postArticle: method makes an API call to create an article with specified attributes in db. 
   * @param article : article object to be saved in the database
   */
  postArticle(article: Article) : Observable<Article> {
    return this.http.post<Article>(this.requestUri.postArticle, {article: article}  , this.headersOptions)
                    .pipe(catchError(ArticleRequestErrorHandlersService.postArticleError));

  }

  /**
   * getArticle: method makes an API call to get article wih specified ID 
   * @param id : id of the article to be fetched
   */
  getArticle(id : String) : Observable<Article> {
    return this.http.get<Article>(this.requestUri.getArticleById+id, this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.getArticleError));
  }

  /**
   * getArticlesWithSectionId: method makes an API call to get article with specied Section ID. 
   * @param id : id of the section whose articles are to be fetched
   *  @returns Articles : list of articles of type  user defined Article Object
   */
  getArticlesWithSectionId(id : String) : Observable<Article[]> {
    return this.http.get<Article[]>(this.requestUri.getArticlesWithSectionId+id, this.headersOptions)
                    .pipe(catchError(ArticleRequestErrorHandlersService.listArticlesError));
  }

  /**
   * getLastRecordId: method makes an API call to get the ID of the last article created in DB
   * @returns id: last articles ID as number
   */
  getLastRecordId(): Observable<{id : number}> {
    return this.http.get<{id: number}>(this.requestUri.getLastArticleId,this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.getLastRecordError));
  }

  /**
   * listArticles: returns all articles in the db *needs to be paginated.
   *  @returns Articles : list of articles of type  user defined Article Object
   */
  listArticles() : Observable<Article[]>{
    return this.http.get<Article[]>(this.requestUri.getArticles, this.headersOptions)
                .pipe(catchError(ArticleRequestErrorHandlersService.listArticlesError));
  }

  /**
   * updateArticle: method makes an API call to update article method with updated article fields
   * @param article : article object with updated attribute values
   * @returns article: object of type article
   */
  updateArticle(article: Article): Observable<Article>{
    return this.http.put<Article>(this.requestUri.updateArticle,{article: article}, this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.putArticleError))
  }

  /**
   * deleteArticle: method makes an API call to delete an article with specific ID (*considering archive)
   * @param id : id of the article to be deleted
   * @returns object: of type 'any' with information if article was successfully deleted or not  
   */
  deleteArticle(id: String) : Observable<any> {
    return this.http.delete<any>(this.requestUri.deleteArticle + id, this.headersOptions )
                // .pipe(catchError(ArticleRequestErrorHandlersService.))
  }

  /**
   * searchArticlesByText: method gets all articles that have the input string in subject
   * @param searchString: string to be searched accross article subjects
   * @returns articles: list of article objects that match the specified input string in subject 
   */
  searchArticlesByText(searchString: string) : Observable<Article[]> {
    return this.http.get<Article[]>(this.requestUri.getArticleBySearchText + searchString, this.headersOptions)
               .pipe(catchError(ArticleRequestErrorHandlersService.listArticlesError));
  }

}
