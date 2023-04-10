import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import { Configuration} from '../configuration'

import { AiContentPostRequest } from '../models/AiContentPostRequest';
import { AiContentResponse } from '../models/AiContentResponse';
import { AiContentResponseRateLimit } from '../models/AiContentResponseRateLimit';
import { CreateOrUpdatePostRequest } from '../models/CreateOrUpdatePostRequest';
import { PostResponse } from '../models/PostResponse';
import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Delete post
     * @param postId Post ID
     * @param nextAuthSessionToken 
     */
    public _delete(postId: string, nextAuthSessionToken: string, _options?: Configuration): Promise<Array<PostResponse>> {
        const result = this.api._delete(postId, nextAuthSessionToken, _options);
        return result.toPromise();
    }

    /**
     * Generate content
     * @param nextAuthSessionToken 
     * @param aiContentPostRequest 
     */
    public aiGenerateContent(nextAuthSessionToken: string, aiContentPostRequest: AiContentPostRequest, _options?: Configuration): Promise<AiContentResponse> {
        const result = this.api.aiGenerateContent(nextAuthSessionToken, aiContentPostRequest, _options);
        return result.toPromise();
    }

    /**
     * Gets posts for a user, the filter userId is required
     * Get posts
     * @param userId The number of items to skip before starting to collect the result set
     * @param nextAuthSessionToken 
     */
    public get(userId: string, nextAuthSessionToken: string, _options?: Configuration): Promise<Array<PostResponse>> {
        const result = this.api.get(userId, nextAuthSessionToken, _options);
        return result.toPromise();
    }

    /**
     * Create post
     * @param nextAuthSessionToken 
     * @param createOrUpdatePostRequest 
     */
    public post(nextAuthSessionToken: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest, _options?: Configuration): Promise<PostResponse> {
        const result = this.api.post(nextAuthSessionToken, createOrUpdatePostRequest, _options);
        return result.toPromise();
    }

    /**
     * Update post
     * @param postId Post ID
     * @param nextAuthSessionToken 
     * @param createOrUpdatePostRequest 
     */
    public put(postId: string, nextAuthSessionToken: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest, _options?: Configuration): Promise<PostResponse> {
        const result = this.api.put(postId, nextAuthSessionToken, createOrUpdatePostRequest, _options);
        return result.toPromise();
    }


}



