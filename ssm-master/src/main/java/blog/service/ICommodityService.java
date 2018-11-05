package blog.service;


import blog.dto.output.Commoditynew;

import java.util.List;

/**
 * Created by Administrator on 2018/10/27.
 */
public interface ICommodityService {
    public int insertCommodity( String id,String shopname, String guige,String jiage, String username,String tupian, String fenlei);
    public List<Commoditynew> selectCommodity(String shopname, String fenlei);
    public List<Commoditynew> selectoederAction();
    public int deleteCommodity( String id);
    public List<Commoditynew>  selecttop(String fenlei,int num);
}
