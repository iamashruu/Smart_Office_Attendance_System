PGDMP     8                    {            attendanceSystem    14.3    14.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17183    attendanceSystem    DATABASE     w   CREATE DATABASE "attendanceSystem" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
 "   DROP DATABASE "attendanceSystem";
                postgres    false            �            1259    17231    alluser    TABLE     �   CREATE TABLE public.alluser (
    userid integer NOT NULL,
    username character varying(50),
    presentdate character varying[]
);
    DROP TABLE public.alluser;
       public         heap    postgres    false            �            1259    17253 
   attendance    TABLE     �   CREATE TABLE public.attendance (
    present_date date NOT NULL,
    id integer NOT NULL,
    join_time time without time zone NOT NULL,
    exit_time time without time zone,
    status boolean NOT NULL
);
    DROP TABLE public.attendance;
       public         heap    postgres    false            �            1259    25491    leave    TABLE     �   CREATE TABLE public.leave (
    id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    days integer NOT NULL,
    leave_type character varying NOT NULL,
    leave_desc character varying NOT NULL
);
    DROP TABLE public.leave;
       public         heap    postgres    false            �            1259    17241    login    TABLE     _   CREATE TABLE public.login (
    hash character varying(100),
    username character varying
);
    DROP TABLE public.login;
       public         heap    postgres    false            �            1259    17246    person    TABLE     �   CREATE TABLE public.person (
    id integer NOT NULL,
    name character varying NOT NULL,
    dept_name character varying NOT NULL,
    phone character varying NOT NULL,
    salary integer NOT NULL,
    role character varying
);
    DROP TABLE public.person;
       public         heap    postgres    false            �            1259    17221    presents    TABLE     X   CREATE TABLE public.presents (
    userid integer,
    presentdate character varying
);
    DROP TABLE public.presents;
       public         heap    postgres    false            �            1259    17184    users    TABLE     i   CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            	          0    17231    alluser 
   TABLE DATA           @   COPY public.alluser (userid, username, presentdate) FROM stdin;
    public          postgres    false    211   F                 0    17253 
   attendance 
   TABLE DATA           T   COPY public.attendance (present_date, id, join_time, exit_time, status) FROM stdin;
    public          postgres    false    214   �                 0    25491    leave 
   TABLE DATA           W   COPY public.leave (id, start_date, end_date, days, leave_type, leave_desc) FROM stdin;
    public          postgres    false    215   �       
          0    17241    login 
   TABLE DATA           /   COPY public.login (hash, username) FROM stdin;
    public          postgres    false    212   \                 0    17246    person 
   TABLE DATA           J   COPY public.person (id, name, dept_name, phone, salary, role) FROM stdin;
    public          postgres    false    213   1                 0    17221    presents 
   TABLE DATA           7   COPY public.presents (userid, presentdate) FROM stdin;
    public          postgres    false    210   �                 0    17184    users 
   TABLE DATA           1   COPY public.users (userid, username) FROM stdin;
    public          postgres    false    209   �       v           2606    17237    alluser alluser_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.alluser
    ADD CONSTRAINT alluser_pkey PRIMARY KEY (userid);
 >   ALTER TABLE ONLY public.alluser DROP CONSTRAINT alluser_pkey;
       public            postgres    false    211            x           2606    17252    person person_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.person DROP CONSTRAINT person_pkey;
       public            postgres    false    213            t           2606    17188    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    209            z           2606    17256    attendance attendance_id_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_id_fkey FOREIGN KEY (id) REFERENCES public.person(id);
 G   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_id_fkey;
       public          postgres    false    214    3192    213            {           2606    25496    leave leave_id_fkey    FK CONSTRAINT     n   ALTER TABLE ONLY public.leave
    ADD CONSTRAINT leave_id_fkey FOREIGN KEY (id) REFERENCES public.person(id);
 =   ALTER TABLE ONLY public.leave DROP CONSTRAINT leave_id_fkey;
       public          postgres    false    3192    213    215            y           2606    17226    presents presents_userid_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.presents
    ADD CONSTRAINT presents_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 G   ALTER TABLE ONLY public.presents DROP CONSTRAINT presents_userid_fkey;
       public          postgres    false    209    3188    210            	   c   x�34���L��64�74�7202�14�7��FFp!#c�,P�!\!�i�ohf�rp:g%���J�FX�2�3a�"�@��T��H7��+F��� .P1�         �   x���Mn� ���.T�M�;DO0랠�Wm�Zf�!�'��1~FH�W:
S�vB�����D��v	���<)�p�a`{!��	�8Yc�����}D�L�p����g��a�KH�}�� dAh�%��!0�j��D��y�ݗ "����m������;�Y`}��D�0�3p�'�ۭ/���b���ʹA����7��%6�dp�⟙�~�W�[ȚD���Y��b�:{����۶� �)�         �   x�34�4202�50�52A0M9�8}SS2�s|R�R9=2�3�R�R��R2RS�3R���`l�i�阗W
����X����eh��`	e� �9v
\��:�LCN��b���Ԣ�Լ�JW�!k1!�[1z\\\ 'yI�      
   �   x���Ar�0  �3yg!�Gt,1bAj /�AH�@������}��s��Z�#�1�mg�6�^+$���Aˆo�/g"�?�6�׋�VS*�i_vR����=�ȃq.~V��Ť,-��e�bt�-�b4�r4Dg����U�-��a�����7^Y��+.pO�09Gf6<���y����W|Ŷ�LW�W�4 ���X�         P  x�U��n�0E��𪻦cK���ڤ$R݌�	n��TJ���KM�+Ks��;�"�a?ؽv�kg!�*;�A�=,a!�D,ā/X���r�Ű�'te�v��X	�8fکj�^�@�z7�4�[�h��Gאo�(�1�H�e��m��0ﬡY�]�j�v��+����������u����-ƶ��Ձ���f�A9���x�����-��Y3й�I@޹{(^fg�`II! �@2���H�<k��}���O�z�/�JD�xZ*�����u�����2z:�[u�l�ܯ����`��>�_TKl�)(d>�Ra�Dc��`:�$�B��ÈQ             x�34�44�74�7202�2D� �b���� �2�         #   x�34���L��24�t,�(JLS��L����� a��     