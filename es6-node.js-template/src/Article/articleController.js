import baseResponse from "../../config/baseResponseStatus";
import { errResponse  ,response} from "../../config/response";
import { createArticle, retrieveArticle, retrieveArticleList } from "./articleService";

export const getNewArticle = (req,res) =>{
    res.render("article/articleForm.pug");
}

export const postNewArticle = async(req,res) =>{
    try
    {
        const {body:{title, description, author}} = req;
        if (!title)
            res.send(response(baseResponse.ARTICLE_TITLE_EMPTY));
        else if (!description)
            res.send(response(baseResponse.ARTICLE_DESCRIPTION_EMPTY));
        else if (!author)
            res.send(response(baseResponse.ARTICLE_AUTHOR_EMPTY));

        const signInResponse =  await createArticle(title,description,author);

        if(signInResponse){
            const ans = {
                status: "성공",
                title,
                description,
                author
            }

            return res.send(JSON.stringify(ans));
        }
    }catch(err){
        console.log(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}   

export const getArticleList = async(req,res)=>{
    try{
        const articleList = await retrieveArticleList();
        res.render("article/articleList.pug",{articles:articleList});
    }catch(err){
        console.log(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

export const getArticle = async(req,res) =>{
    try{
        const{params:{id}} = req;
        if (!id)
            return res.send(response(baseResponse.ARTICLE_ID_EMPTY));
        const articleResult = await retrieveArticle(id);
        const ans = response(baseResponse.SUCCESS,articleResult);
        res.send(ans);
    }catch(err){
        console.log(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}

export const updateArticle = async(req, res)=>{
    try{
        const {title, description} = req;
        console.log(title,description);
    }catch(err){
        console.log(err);
        return errResponse(baseResponse.DB_ERROR);
    }
}