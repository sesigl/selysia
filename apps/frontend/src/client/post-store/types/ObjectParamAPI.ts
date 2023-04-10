import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import { Configuration} from '../configuration'

import { AiContentPostRequest } from '../models/AiContentPostRequest';
import { AiContentResponse } from '../models/AiContentResponse';
import { AiContentResponseRateLimit } from '../models/AiContentResponseRateLimit';
import { CreateOrUpdatePostRequest } from '../models/CreateOrUpdatePostRequest';
import { PostResponse } from '../models/PostResponse';

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiDeleteRequest {
    /**
     * Post ID
     * @type string
     * @memberof DefaultApi_delete
     */
    postId: string
    /**
     * 
     * @type string
     * @memberof DefaultApi_delete
     */
    nextAuthSessionToken: string
}

export interface DefaultApiAiGenerateContentRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApiaiGenerateContent
     */
    nextAuthSessionToken: string
    /**
     * 
     * @type AiContentPostRequest
     * @memberof DefaultApiaiGenerateContent
     */
    aiContentPostRequest: AiContentPostRequest
}

export interface DefaultApiGetRequest {
    /**
     * The number of items to skip before starting to collect the result set
     * @type string
     * @memberof DefaultApiget
     */
    userId: string
    /**
     * 
     * @type string
     * @memberof DefaultApiget
     */
    nextAuthSessionToken: string
}

export interface DefaultApiPostRequest {
    /**
     * 
     * @type string
     * @memberof DefaultApipost
     */
    nextAuthSessionToken: string
    /**
     * 
     * @type CreateOrUpdatePostRequest
     * @memberof DefaultApipost
     */
    createOrUpdatePostRequest: CreateOrUpdatePostRequest
}

export interface DefaultApiPutRequest {
    /**
     * Post ID
     * @type string
     * @memberof DefaultApiput
     */
    postId: string
    /**
     * 
     * @type string
     * @memberof DefaultApiput
     */
    nextAuthSessionToken: string
    /**
     * 
     * @type CreateOrUpdatePostRequest
     * @memberof DefaultApiput
     */
    createOrUpdatePostRequest: CreateOrUpdatePostRequest
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Delete post
     * @param param the request object
     */
    public _delete(param: DefaultApiDeleteRequest, options?: Configuration): Promise<Array<PostResponse>> {
        return this.api._delete(param.postId, param.nextAuthSessionToken,  options).toPromise();
    }

    /**
     * Generate content
     * @param param the request object
     */
    public aiGenerateContent(param: DefaultApiAiGenerateContentRequest, options?: Configuration): Promise<AiContentResponse> {
        return this.api.aiGenerateContent(param.nextAuthSessionToken, param.aiContentPostRequest,  options).toPromise();
    }

    /**
     * Gets posts for a user, the filter userId is required
     * Get posts
     * @param param the request object
     */
    public get(param: DefaultApiGetRequest, options?: Configuration): Promise<Array<PostResponse>> {
        return this.api.get(param.userId, param.nextAuthSessionToken,  options).toPromise();
    }

    /**
     * Create post
     * @param param the request object
     */
    public post(param: DefaultApiPostRequest, options?: Configuration): Promise<PostResponse> {
        return this.api.post(param.nextAuthSessionToken, param.createOrUpdatePostRequest,  options).toPromise();
    }

    /**
     * Update post
     * @param param the request object
     */
    public put(param: DefaultApiPutRequest, options?: Configuration): Promise<PostResponse> {
        return this.api.put(param.postId, param.nextAuthSessionToken, param.createOrUpdatePostRequest,  options).toPromise();
    }

}
