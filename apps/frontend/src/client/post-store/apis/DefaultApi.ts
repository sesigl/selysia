// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { AiContentPostRequest } from '../models/AiContentPostRequest';
import { AiContentResponse } from '../models/AiContentResponse';
import { CreateOrUpdatePostRequest } from '../models/CreateOrUpdatePostRequest';
import { PostResponse } from '../models/PostResponse';

/**
 * no description
 */
export class DefaultApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Delete post
     * @param postId Post ID
     * @param nextAuthSessionToken 
     */
    public async _delete(postId: string, nextAuthSessionToken: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'postId' is not null or undefined
        if (postId === null || postId === undefined) {
            throw new RequiredError("DefaultApi", "_delete", "postId");
        }


        // verify required parameter 'nextAuthSessionToken' is not null or undefined
        if (nextAuthSessionToken === null || nextAuthSessionToken === undefined) {
            throw new RequiredError("DefaultApi", "_delete", "nextAuthSessionToken");
        }


        // Path Params
        const localVarPath = '/posts/{postId}'
            .replace('{' + 'postId' + '}', encodeURIComponent(String(postId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Header Params
        requestContext.setHeaderParam("next-auth.session-token", ObjectSerializer.serialize(nextAuthSessionToken, "string", "jwt"));


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Generate content
     * @param nextAuthSessionToken 
     * @param aiContentPostRequest 
     */
    public async aiGenerateContent(nextAuthSessionToken: string, aiContentPostRequest: AiContentPostRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'nextAuthSessionToken' is not null or undefined
        if (nextAuthSessionToken === null || nextAuthSessionToken === undefined) {
            throw new RequiredError("DefaultApi", "aiGenerateContent", "nextAuthSessionToken");
        }


        // verify required parameter 'aiContentPostRequest' is not null or undefined
        if (aiContentPostRequest === null || aiContentPostRequest === undefined) {
            throw new RequiredError("DefaultApi", "aiGenerateContent", "aiContentPostRequest");
        }


        // Path Params
        const localVarPath = '/ai/generate-content';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Header Params
        requestContext.setHeaderParam("next-auth.session-token", ObjectSerializer.serialize(nextAuthSessionToken, "string", "jwt"));


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(aiContentPostRequest, "AiContentPostRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Gets posts for a user, the filter userId is required
     * Get posts
     * @param userId The number of items to skip before starting to collect the result set
     * @param nextAuthSessionToken 
     */
    public async get(userId: string, nextAuthSessionToken: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'userId' is not null or undefined
        if (userId === null || userId === undefined) {
            throw new RequiredError("DefaultApi", "get", "userId");
        }


        // verify required parameter 'nextAuthSessionToken' is not null or undefined
        if (nextAuthSessionToken === null || nextAuthSessionToken === undefined) {
            throw new RequiredError("DefaultApi", "get", "nextAuthSessionToken");
        }


        // Path Params
        const localVarPath = '/posts';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (userId !== undefined) {
            requestContext.setQueryParam("userId", ObjectSerializer.serialize(userId, "string", ""));
        }

        // Header Params
        requestContext.setHeaderParam("next-auth.session-token", ObjectSerializer.serialize(nextAuthSessionToken, "string", "jwt"));


        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Create post
     * @param nextAuthSessionToken 
     * @param createOrUpdatePostRequest 
     */
    public async post(nextAuthSessionToken: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'nextAuthSessionToken' is not null or undefined
        if (nextAuthSessionToken === null || nextAuthSessionToken === undefined) {
            throw new RequiredError("DefaultApi", "post", "nextAuthSessionToken");
        }


        // verify required parameter 'createOrUpdatePostRequest' is not null or undefined
        if (createOrUpdatePostRequest === null || createOrUpdatePostRequest === undefined) {
            throw new RequiredError("DefaultApi", "post", "createOrUpdatePostRequest");
        }


        // Path Params
        const localVarPath = '/posts';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Header Params
        requestContext.setHeaderParam("next-auth.session-token", ObjectSerializer.serialize(nextAuthSessionToken, "string", "jwt"));


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(createOrUpdatePostRequest, "CreateOrUpdatePostRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update post
     * @param postId Post ID
     * @param nextAuthSessionToken 
     * @param createOrUpdatePostRequest 
     */
    public async put(postId: string, nextAuthSessionToken: string, createOrUpdatePostRequest: CreateOrUpdatePostRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'postId' is not null or undefined
        if (postId === null || postId === undefined) {
            throw new RequiredError("DefaultApi", "put", "postId");
        }


        // verify required parameter 'nextAuthSessionToken' is not null or undefined
        if (nextAuthSessionToken === null || nextAuthSessionToken === undefined) {
            throw new RequiredError("DefaultApi", "put", "nextAuthSessionToken");
        }


        // verify required parameter 'createOrUpdatePostRequest' is not null or undefined
        if (createOrUpdatePostRequest === null || createOrUpdatePostRequest === undefined) {
            throw new RequiredError("DefaultApi", "put", "createOrUpdatePostRequest");
        }


        // Path Params
        const localVarPath = '/posts/{postId}'
            .replace('{' + 'postId' + '}', encodeURIComponent(String(postId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Header Params
        requestContext.setHeaderParam("next-auth.session-token", ObjectSerializer.serialize(nextAuthSessionToken, "string", "jwt"));


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(createOrUpdatePostRequest, "CreateOrUpdatePostRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class DefaultApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to _delete
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async _delete(response: ResponseContext): Promise<Array<PostResponse> > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<PostResponse> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<PostResponse>", ""
            ) as Array<PostResponse>;
            return body;
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "An error message", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<PostResponse> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<PostResponse>", ""
            ) as Array<PostResponse>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aiGenerateContent
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async aiGenerateContent(response: ResponseContext): Promise<AiContentResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: AiContentResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AiContentResponse", ""
            ) as AiContentResponse;
            return body;
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "An error message", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: AiContentResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AiContentResponse", ""
            ) as AiContentResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to get
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async get(response: ResponseContext): Promise<Array<PostResponse> > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<PostResponse> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<PostResponse>", ""
            ) as Array<PostResponse>;
            return body;
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "An error message", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<PostResponse> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<PostResponse>", ""
            ) as Array<PostResponse>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to post
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async post(response: ResponseContext): Promise<PostResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: PostResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PostResponse", ""
            ) as PostResponse;
            return body;
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "An error message", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: PostResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PostResponse", ""
            ) as PostResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to put
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async put(response: ResponseContext): Promise<PostResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("204", response.httpStatusCode)) {
            const body: PostResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PostResponse", ""
            ) as PostResponse;
            return body;
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, "An error message", undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: PostResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PostResponse", ""
            ) as PostResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
