package blog.mapper;

import blog.dao.Commodity;
import blog.dto.output.Commoditynew;
import java.util.List;
import org.apache.ibatis.annotations.Param;

/**
 * Created by Administrator on 2018/10/27.
 */
public interface CommodityMapper {
    public int insertCommodity(Commodity commodity);
    public List<Commoditynew> selectCommodity(@Param("shopname") String shopname, @Param("fenlei") String fenlei);
    public List<Commoditynew>  selectoederAction();
    public int deleteCommodity(String  id);
    public List<Commoditynew>  selecttop(@Param("fenlei") String fenlei,@Param("num") int num);

}
