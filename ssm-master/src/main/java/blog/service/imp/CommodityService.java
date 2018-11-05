package blog.service.imp;
import java.util.List;
import blog.dao.Commodity;
import blog.dto.output.Commoditynew;
import blog.mapper.CommodityMapper;
import blog.service.ICommodityService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Created by Administrator on 2018/10/27.
 */
@Service
public class CommodityService  implements ICommodityService {
    @Autowired
    private CommodityMapper commodityMapper;

    @Override
    public int insertCommodity(String id, String shopname, String guige, String jiage, String username, String tupian, String fenlei) {
        Commodity commodity = new Commodity();
        commodity.setId(id);
        commodity.setShopname(shopname);
        commodity.setGuige(guige);
        commodity.setJiage(jiage);
       // tupian= Base64Test.GetImageStr(tupian);
        commodity.setTupian(tupian);
        commodity.setFenlei(fenlei);
        commodity.setUsername(username);
        int num=commodityMapper.insertCommodity(commodity);
        return num;
    }

    @Override
    public List<Commoditynew> selectCommodity(String shopname, String fenlei) {
        List<Commoditynew> commodity =commodityMapper.selectCommodity(shopname,fenlei);
        if(commodity==null){}
        return commodity;
    }
   @Override
    public List<Commoditynew> selectoederAction() {
       List<Commoditynew> commodity=commodityMapper.selectoederAction();
        return commodity;
    }


    @Override
    public int deleteCommodity(String id) {
        int num=commodityMapper.deleteCommodity(id);
        return num;
    }

    @Override
    public List<Commoditynew> selecttop(String fenlei,int num) {
        List<Commoditynew> commodity =commodityMapper.selecttop(fenlei,num);
        if(commodity==null){}
        return commodity;
    }


}
