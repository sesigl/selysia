import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { AiContentPostRequest } from '../models/AiContentPostRequest';
import { AiContentResponse } from '../models/AiContentResponse';
import { AiContentResponseRateLimit } from '../models/AiContentResponseRateLimit';
import { CreateOrUpdatePostRequest } from '../models/CreateOrUpdatePostRequest';
import { PostResponse } from '../models/PostResponse';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
    }

    /**
     * Delete post
     * @param postId Post ID
     * @param nextAuthSessionToken 
     */
    public _delete(postId: string, nextAuthSessionToken: string, _options?: Configuration): Observable<Array<PostResponse>> {
        const requestContextPromise = this.requestFactory._delete(postId, nextAuthSessionToken, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor._delete(rsp)));
            }));
    }

    /**
     * Generate content
     * @param nextAuthSessionToken 
     * @param aiContentPostRequest 
     */
    public aiGenerateContent(nextAuthSessionToken: string, aiContentPostRequest: AiContentPostRequest, _options?: Configuration): Observable<AiContentResponse> {
        const requestContextPromise = this.requestFactory.aiGenerateContent(nextAuthSessionToken, aiContentPostRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aiGenerateContent(rsp)));
            }));
    }

    /**
     * Gets posts for a user, the filter userId is required
     * Get posts
     * @param userId The number of items to skip before starting to collect the result set
     * @param nextAuthSessionToken 
     */
    public get(userId: string, nextAuthSessionToken: string, _options?: Configuration): Observable<Array<PostResponse>> {
        const requestContextPromise = this.requestFactory.get(userId, nextAuthSessionToken, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.get(rsp)));
            }));
    }

    /**
     * Create post
     * @param nextAuthSessionToken 
     * @param createOrUpdatePostRequest 
     */
    public post(nextAuthSessionToken: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest, _options?: Configuration): Observable<PostResponse> {
        const requestContextPromise = this.requestFactory.post(nextAuthSessionToken, createOrUpdatePostRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.post(rsp)));
            }));
    }

    /**
     * Update post
     * @param postId Post ID
     * @param nextAuthSessionToken 
     * @param createOrUpdatePostRequest 
     */
    public put(postId: string, nextAuthSessionToken: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest, _options?: Configuration): Observable<PostResponse> {
        const requestContextPromise = this.requestFactory.put(postId, nextAuthSessionToken, createOrUpdatePostRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.put(rsp)));
            }));
    }

}
