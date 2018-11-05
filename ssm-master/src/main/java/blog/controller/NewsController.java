package blog.controller;

import blog.dao.Commodity;
import blog.dao.News;
import blog.dto.output.NewDetails;
import blog.service.ICommodityService;
import blog.service.INewsService;
import core.ajaxResult.AjaxResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.UUID;

/**
 * Created by Administrator on 2018/10/27.
 */
@Controller
@CrossOrigin
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private INewsService inewsservice;
    @ResponseBody
    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public AjaxResult insertNews(String biaoti, String neirong,String chuangjianren) {
        String id= UUID.randomUUID().toString().replace("-", "");
        String riqi=null;
        int num  = inewsservice.insertNews(id,biaoti, neirong,chuangjianren,riqi);
     /*   if(userDetails==null){
            return AjaxResult.getOK("用户名或密码错误",userDetails);
        }*/
        AjaxResult ajax=null;
        if(num>0){
            ajax=AjaxResult.getOKnew();
        }else{
            ajax=AjaxResult.geterrornew();
        }
        return ajax;
    }
    @ResponseBody
    @RequestMapping(value = "/select", method = RequestMethod.GET)
    public AjaxResult selectNews(String biaoti,String chuangjianren) {
        String id= UUID.randomUUID().toString().replace("-", "");
        List<NewDetails> news = inewsservice.selectNews(biaoti,chuangjianren);
        if(news==null){
            return AjaxResult.geterrornew();
        }
        return AjaxResult.getOK(news);
    }
    @ResponseBody
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public AjaxResult deleteNews(String id) {
        // String id= UUID.randomUUID().toString().replace("-", "");
        int num = inewsservice.deleteNews(id);
        AjaxResult ajax=null;
        if(num>0){
            ajax=AjaxResult.getOKnew();
        }else{
            ajax=AjaxResult.geterrornew();
        }
        return ajax;
    }

    @ResponseBody
    @RequestMapping(value = "/selectoeder", method = RequestMethod.GET)
    public AjaxResult selectoeder() {
        String id= UUID.randomUUID().toString().replace("-", "");
        List<NewDetails> news = inewsservice.selectoederAction();
        if(news==null){
            return AjaxResult.geterrornew();
        }
        return AjaxResult.getOK(news);
    }
}
