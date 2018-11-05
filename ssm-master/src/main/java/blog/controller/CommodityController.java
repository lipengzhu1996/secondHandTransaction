package blog.controller;


import blog.dto.output.Commoditynew;

import core.ajaxResult.AjaxResult;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import blog.service.ICommodityService;


/**
 * Created by Administrator on 2018/10/27.
 */
@Controller
@CrossOrigin
@RequestMapping("/commodity")
public class CommodityController {
    @Autowired
    private ICommodityService icommodityService;
    @ResponseBody
    @RequestMapping(value = "/insert", method = RequestMethod.POST )
    public AjaxResult insertAction(String shopname, String guige,String jiage, String username,String tupian, String fenlei) {
        String id= UUID.randomUUID().toString().replace("-", "");
        int num  = icommodityService.insertCommodity(id,shopname, guige,jiage,username,tupian,fenlei);
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
    public AjaxResult selectAction(String shopname,String fenlei) {
        String id= UUID.randomUUID().toString().replace("-", "");
        List<Commoditynew> commodity=new ArrayList<Commoditynew>();
       commodity =  icommodityService.selectCommodity( shopname, fenlei);
      if(commodity==null){
            return AjaxResult.geterrornew();
        }
        return AjaxResult.getOK(commodity);
    }
    @ResponseBody
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public AjaxResult deleteAction(String id) {
       // String id= UUID.randomUUID().toString().replace("-", "");
       int num = icommodityService.deleteCommodity(id);
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
    public AjaxResult selectoederAction(String shopname) {
        String id= UUID.randomUUID().toString().replace("-", "");
       List<Commoditynew> commodity = icommodityService.selectoederAction();
        if(commodity==null){
            return AjaxResult.geterrornew();
        }
        return AjaxResult.getOK(commodity);
    }

    @ResponseBody
    @RequestMapping(value = "/testImage", method = RequestMethod.POST)
    public Object testImage(String tupian) {
        Map map = new HashMap();
        map.put("imageFile", tupian);
        return map;
    }

    @ResponseBody
    @RequestMapping(value = "/selecttop", method = RequestMethod.GET)
    public AjaxResult selecttop(String fenlei,int num) {
        String id= UUID.randomUUID().toString().replace("-", "");
        List<Commoditynew> commodity = icommodityService.selecttop(fenlei ,num);
        if(commodity==null){
            return AjaxResult.geterrornew();
        }
        return AjaxResult.getOK(commodity);
    }


}
