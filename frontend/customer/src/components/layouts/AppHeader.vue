<template>
    <header class="fixed-top">
        <div class="container-lg bg-white">
            
            <nav class="navbar navbar-expand-md navbar-light " >
                <a class="navbar-brand" href="">HT Online Shop</a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <form class="mx-auto d-flex">
                        <div class="input-group ">
                            <input class="form-control border-secondary py-2 rounded-0" type="search" placeholder="Search" aria-label="Search">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary border-secondary rounded-0" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Trang chủ</router-link>
                            <!-- <a class="nav-link" href="">Trang chủ<span class="sr-only">(current)</span></a> -->
                        </li>
                        <template v-if="isAuth">
                                <li class="nav-item dropdown ">
                                <!-- <a class="nav-link" href="">Giới thiệu</a> -->
                                <router-link to="/order" class="nav-link">Đơn hàng</router-link>
                                </li>
                            
                                <li class="nav-item dropdown">
                                    <sapn class="nav-link text-primary fw-bold" @click="logout" style="cursor: pointer;">Đăng xuất</sapn>
                                
                                </li>
                            
                                <li class="nav-item dropdown ">
                                <router-link to="/cart" class="nav-link position-relative">
                                        <i class="fa-solid fa-cart-shopping"></i>
                                        <span class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: small;">{{ cartCount }}</span>
                                </router-link>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item dropdown ">
                                    <!-- <a class="nav-link" href="">Giới thiệu</a> -->
                                <router-link to="/login" class="nav-link">Đăng nhập</router-link>
                            </li>
                                    <li class="nav-item dropdown ">
                                   
                                    <router-link to="/register" class="nav-link">Đăng ký</router-link>
                                    </li>
                        </template>
                        
                    </ul>
                </div>
            </nav>

            <!-- <nav class="navbar navbar-expand-md navbar-light " v-else>
                <a class="navbar-brand" href="">Angelo Online Shop</a>
                <div class="ms-auto">
                    <h4>Angelo Shop xin kính chào quý khách</h4>
                </div>
            </nav> -->
        </div>
    </header>
</template>

<script>
import { useCartStore } from '@/stores/CartStore';
import { mapActions, mapState} from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
export default {
//   computed: {
    
//   },
//   computed: {
//     ...mapState(useCartStore, {
//       cartCount: (state) => state.cartCount,
//     }),
//   },
    methods: {
        ...mapActions(useAuthStore, {
            logout: "logout"
        }),
        
    },
    computed: {
        ...mapState(useAuthStore, {
            isAuth: 'isAuth',
        }),
        
        ...mapState(useCartStore, ['cart']),
        cartCount() {
            return this.cart.items.length;
        }
    }
}
</script>

<style scoped>
    .form-control:focus {
        border-color: #0c75de;
        box-shadow: none;
    }

    .btn-outline-secondary:hover {
        background-color: #0b77e2;
    }

    .input-group-append button {
        border-color: #1079e2;
    }

    .input-group-append button:hover {
        background-color: #f8f9fa;
    }
</style>